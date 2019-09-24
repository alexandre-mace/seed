<?php


namespace App\Utils;


use App\Domain\ForumTopics;
use App\Entity\Forum;
use App\Entity\Topic;

class ForumInitiator
{
    private $forumTopics;

    public function __construct(ForumTopics $forumTopics)
    {
        $this->forumTopics = $forumTopics;
    }

    public function initiate(): Forum
    {
        $forum = new Forum();

        foreach ($this->forumTopics->getForumTopics() as $forumTopic) {
            $topic = new Topic();
            $topic->setTitle($forumTopic);
            $forum->addTopic($topic);
        }

        return $forum;
    }
}
