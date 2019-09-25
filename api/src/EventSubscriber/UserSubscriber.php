<?php

namespace App\EventSubscriber;

use Doctrine\Common\EventSubscriber;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;

class UserSubscriber implements EventSubscriber
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function getSubscribedEvents()
    {
        return array(
            'prePersist',
            'preUpdate'
        );
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof User) {
            return;
        }

        $this->encode($entity);
        $entity->setCreatedAt();
    }

    public function preUpdate(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof User) {
            return;
        }

        $this->encode($entity);
        $entity->setUpdatedAt(new \DateTime());
    }

    public function encode(User $entity)
    {
        if ($entity->getPassword()) {
            $password = $this->encoder->encodePassword($entity, $entity->getPassword());
            $entity->setPassword($password);
        }
    }
}
