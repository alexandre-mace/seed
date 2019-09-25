<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Behavior\Timestampable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     attributes={
 *         "formats"={"jsonld"},
 *         "normalization_context"={"groups"={"project", "project:read"}},
 *         "denormalizationContext"={"groups"={"project", "project:write"}}
 *     },
 * )
 * @ApiFilter(OrderFilter::class, properties={"likes"}, arguments={"orderParameterName"="order"})
 * @ApiFilter(SearchFilter::class, properties={"pitch": "partial"})
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 */
class Project
{
    use Timestampable;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"project"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotNull
     * @Assert\NotBlank
     * @Assert\Type("string")
     * @Groups({"project"})
     */
    private $pitch;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotNull
     * @Assert\NotBlank
     * @Assert\Type("string")
     * @Groups({"project"})
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"project"})
     */
    private $likes = 0;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="initiatedProjects")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"project"})
     */
    private $initiator;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="supportedProjects")
     * @ORM\JoinTable(name="project_supporters")
     * @Groups({"project"})
     */
    private $supporters;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     * @Groups({"project"})
     */
    private $categories;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Forum", mappedBy="project", cascade={"persist", "remove"})
     * @Groups({"project"})
     */
    private $forum;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="joinedProjects")
     * @ORM\JoinTable(name="project_members")
     */
    private $members;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\JoinDemand", mappedBy="relatedProject")
     */
    private $joinDemands;

    public function __construct()
    {
        $this->topics = new ArrayCollection();
        $this->supporters = new ArrayCollection();
        $this->members = new ArrayCollection();
        $this->joinDemands = new ArrayCollection();
    }
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getPitch(): ?string
    {
        return $this->pitch;
    }

    public function setPitch(string $pitch): self
    {
        $this->pitch = $pitch;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getLikes(): ?int
    {
        return $this->likes;
    }

    public function setLikes(int $likes): self
    {
        $this->likes = $likes;

        return $this;
    }

    public function getInitiator(): ?User
    {
        return $this->initiator;
    }

    public function setInitiator(?User $initiator): self
    {
        $this->initiator = $initiator;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getSupporters(): Collection
    {
        return $this->supporters;
    }

    public function addSupporter(User $supporter): self
    {
        if (!$this->supporters->contains($supporter)) {
            $this->supporters[] = $supporter;
        }

        return $this;
    }

    public function removeSupporter(User $supporter): self
    {
        if ($this->supporters->contains($supporter)) {
            $this->supporters->removeElement($supporter);
        }

        return $this;
    }

    public function getCategories()
    {
        return $this->categories;
    }

    public function setCategories($categories): self
    {
        $this->categories = $categories;

        return $this;
    }

    public function getForum(): ?Forum
    {
        return $this->forum;
    }

    public function setForum(Forum $forum): self
    {
        $this->forum = $forum;

        // set the owning side of the relation if necessary
        if ($this !== $forum->getProject()) {
            $forum->setProject($this);
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function addMember(User $member): self
    {
        if (!$this->members->contains($member)) {
            $this->members[] = $member;
        }

        return $this;
    }

    public function removeMember(User $member): self
    {
        if ($this->members->contains($member)) {
            $this->members->removeElement($member);
        }

        return $this;
    }

    /**
     * @return Collection|JoinDemand[]
     */
    public function getJoinDemands(): Collection
    {
        return $this->joinDemands;
    }

    public function addJoinDemand(JoinDemand $joinDemand): self
    {
        if (!$this->joinDemands->contains($joinDemand)) {
            $this->joinDemands[] = $joinDemand;
            $joinDemand->setProject($this);
        }

        return $this;
    }

    public function removeJoinDemand(JoinDemand $joinDemand): self
    {
        if ($this->joinDemands->contains($joinDemand)) {
            $this->joinDemands->removeElement($joinDemand);
            // set the owning side to null (unless already changed)
            if ($joinDemand->getProject() === $this) {
                $joinDemand->setProject(null);
            }
        }

        return $this;
    }
}
