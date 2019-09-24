<?php

namespace App\EventSubscriber;

use App\Utils\ForumInitiator;
use Doctrine\Common\EventSubscriber;
use App\Entity\Project;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;

class ProjectSubscriber implements EventSubscriber
{
    private $forumInitiator;

    public function __construct(ForumInitiator $forumInitiator)
    {
        $this->forumInitiator = $forumInitiator;
    }

    public function getSubscribedEvents()
    {
        return array(
            'prePersist',
        );
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof Project) {
            return;
        }

        $entity->setCreatedAt(new \DateTime());
        $entity->setForum($this->forumInitiator->initiate());
    }
}
