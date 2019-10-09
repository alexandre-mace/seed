<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Behavior\Timestampable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ApiResource(
 *     attributes={
 *         "formats"={"jsonld"},
 *         "normalization_context"={"groups"={"user", "user:read"}, "enable_max_depth"=true},
 *         "denormalizationContext"={"groups"={"user", "user:write"}, "enable_max_depth"=true}
 *     },
 * )
 * @ORM\Table(name="app_user")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository" )
 * @UniqueEntity("email")
 * @ApiFilter(SearchFilter::class, properties={"email": "exact"})
 */
class User implements UserInterface
{
    use Timestampable;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"project", "user"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\Email
     * @Groups({"project", "user"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project", "user"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user"})
     */
    private $lastName;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Message", mappedBy="author")
     * @Groups({"user"})
     */
    private $messages;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Project", mappedBy="initiator")
     * @MaxDepth(1)
     * @Groups({"user"})
     */
    private $initiatedProjects;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Project", mappedBy="supporters")
     * @Groups({"user"})
     */
    private $supportedProjects;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Project", mappedBy="members")
     * @Groups({"user"})
     */
    private $joinedProjects;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\JoinDemand", mappedBy="demander")
     * @MaxDepth(2)
     * @Groups({"user"})
     */
    private $joinDemands;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
        $this->initiatedProjects = new ArrayCollection();
        $this->supportedProjects = new ArrayCollection();
        $this->joinedProjects = new ArrayCollection();
        $this->joinDemands = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setAuthor($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->contains($message)) {
            $this->messages->removeElement($message);
            // set the owning side to null (unless already changed)
            if ($message->getAuthor() === $this) {
                $message->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Project[]
     */
    public function getInitiatedProjects(): Collection
    {
        return $this->initiatedProjects;
    }

    public function addInitiatedProject(Project $initiatedProject): self
    {
        if (!$this->initiatedProjects->contains($initiatedProject)) {
            $this->initiatedProjects[] = $initiatedProject;
            $initiatedProject->setInitiator($this);
        }

        return $this;
    }

    public function removeInitiatedProject(Project $initiatedProject): self
    {
        if ($this->initiatedProjects->contains($initiatedProject)) {
            $this->initiatedProjects->removeElement($initiatedProject);
            // set the owning side to null (unless already changed)
            if ($initiatedProject->getInitiator() === $this) {
                $initiatedProject->setInitiator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Project[]
     */
    public function getSupportedProjects(): Collection
    {
        return $this->supportedProjects;
    }

    public function addSupportedProject(Project $supportedProject): self
    {
        if (!$this->supportedProjects->contains($supportedProject)) {
            $this->supportedProjects[] = $supportedProject;
            $supportedProject->addSupporter($this);
        }

        return $this;
    }

    public function removeSupportedProject(Project $supportedProject): self
    {
        if ($this->supportedProjects->contains($supportedProject)) {
            $this->supportedProjects->removeElement($supportedProject);
            $supportedProject->removeSupporter($this);
        }

        return $this;
    }

    /**
     * @return Collection|Project[]
     */
    public function getJoinedProjects(): Collection
    {
        return $this->joinedProjects;
    }

    public function addJoinedProject(Project $joinedProject): self
    {
        if (!$this->joinedProjects->contains($joinedProject)) {
            $this->joinedProjects[] = $joinedProject;
            $joinedProject->addMember($this);
        }

        return $this;
    }

    public function removeJoinedProject(Project $joinedProject): self
    {
        if ($this->joinedProjects->contains($joinedProject)) {
            $this->joinedProjects->removeElement($joinedProject);
            $joinedProject->removeMember($this);
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
            $joinDemand->setDemander($this);
        }

        return $this;
    }

    public function removeJoinDemand(JoinDemand $joinDemand): self
    {
        if ($this->joinDemands->contains($joinDemand)) {
            $this->joinDemands->removeElement($joinDemand);
            // set the owning side to null (unless already changed)
            if ($joinDemand->getDemander() === $this) {
                $joinDemand->setDemander(null);
            }
        }

        return $this;
    }
}
