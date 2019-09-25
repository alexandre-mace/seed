<?php

namespace App\Repository;

use App\Entity\JoinDemand;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method JoinDemand|null find($id, $lockMode = null, $lockVersion = null)
 * @method JoinDemand|null findOneBy(array $criteria, array $orderBy = null)
 * @method JoinDemand[]    findAll()
 * @method JoinDemand[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class JoinDemandRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, JoinDemand::class);
    }

    // /**
    //  * @return JoinDemand[] Returns an array of JoinDemand objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('j')
            ->andWhere('j.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('j.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?JoinDemand
    {
        return $this->createQueryBuilder('j')
            ->andWhere('j.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
