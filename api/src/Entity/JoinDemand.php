<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
/**
 * @ApiResource(
 *     attributes={
 *         "formats"={"jsonld"},
 *         "normalization_context"={"groups"={"joinDemand", "joinDemand:read"}, "enable_max_depth"=true},
 *         "denormalizationContext"={"groups"={"joinDemand", "joinDemand:write"}, "enable_max_depth"=true}
 *     },
 * ) * @ORM\Entity(repositoryClass="App\Repository\JoinDemandRepository")
 */
class JoinDemand
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"project", "joinDemand"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="joinDemands")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"user", "project", "joinDemand"})
     */
    private $demander;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="joinDemands")
     * @ORM\JoinColumn(nullable=false)
     * @MaxDepth(1)
     * @Groups({"user", "joinDemand"})
     */
    private $relatedProject;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user", "project", "joinDemand"})
     */
    private $status;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDemander(): ?User
    {
        return $this->demander;
    }

    public function setDemander(?User $demander): self
    {
        $this->demander = $demander;

        return $this;
    }

    public function getRelatedProject(): ?Project
    {
        return $this->relatedProject;
    }

    public function setProject(?Project $relatedProject): self
    {
        $this->relatedProject = $relatedProject;

        return $this;
    }

    public function getStatus(): ?string
    {
        switch ($this->status) {
            case 'pending':
                return 'En attente';
                break;
            default:
                return $this->status;
        }
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
}
