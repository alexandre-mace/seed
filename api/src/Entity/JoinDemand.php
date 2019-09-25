<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\JoinDemandRepository")
 */
class JoinDemand
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="joinDemands")
     * @ORM\JoinColumn(nullable=false)
     */
    private $demander;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="joinDemands")
     * @ORM\JoinColumn(nullable=false)
     */
    private $relatedProject;

    /**
     * @ORM\Column(type="string", length=255)
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
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
}
