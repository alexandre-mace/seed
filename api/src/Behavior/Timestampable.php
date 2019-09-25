<?php
/**
 * Created by PhpStorm.
 * User: alex
 * Date: 06/07/19
 * Time: 11:06
 */

namespace App\Behavior;

trait Timestampable {
    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    public function getCreatedAt()
    {
        return $this->createdAt !== null
            ? $this->createdAt->format('Y-m-d H:i:s')
            : $this->createdAt;
    }

    public function setCreatedAt(): self
    {
        $this->createdAt = new \DateTime('now', new \DateTimeZone('Europe/Paris'));

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

}
