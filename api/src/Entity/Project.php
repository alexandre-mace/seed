<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
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
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"project", "user"})
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
     * @ORM\OneToMany(targetEntity="App\Entity\Discussion", mappedBy="project")
     * @Groups({"project"})
     */
    private $discussions;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="initiatedProjects")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"project"})
     */
    private $initiator;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="supportedProjects")
     * @Groups({"project"})
     */
    private $supporters;

    public function __construct()
    {
        $this->discussions = new ArrayCollection();
        $this->supporters = new ArrayCollection();
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

    /**
     * @return Collection|Discussion[]
     */
    public function getDiscussions(): Collection
    {
        return $this->discussions;
    }

    public function addDiscussion(Discussion $discussion): self
    {
        if (!$this->discussions->contains($discussion)) {
            $this->discussions[] = $discussion;
            $discussion->setProject($this);
        }

        return $this;
    }

    public function removeDiscussion(Discussion $discussion): self
    {
        if ($this->discussions->contains($discussion)) {
            $this->discussions->removeElement($discussion);
            // set the owning side to null (unless already changed)
            if ($discussion->getProject() === $this) {
                $discussion->setProject(null);
            }
        }

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
}
