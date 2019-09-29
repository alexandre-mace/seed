import React from 'react';
import {Typography} from "@material-ui/core";
import CustomMaterialButton from "../../utils/CustomMaterialButton";
import {fetch} from "../../utils/dataAccess";
import jsonLDFlattner from "../../utils/jsonLDFlattener";

export default function MyProjectDemands(props) {
  const acceptDemand = (demand) => {
    return fetch(demand['@id'], {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/ld+json' }),
      body: JSON.stringify({ status: 'accepted' })
    })
      .then(() => {
        let members = jsonLDFlattner(props.project.members)
        members.push(demand.demander['@id'])
        fetch(props.project['@id'], {
          method: 'PUT',
          headers: new Headers({ 'Content-Type': 'application/ld+json' }),
          body: JSON.stringify({ members: members })
        })
          .then(() => {
            props.reloadMyProjects();
            props.reloadDashboard();
          })
      })
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {props.project && (
            <>
              {props.project.joinDemands.length > 0 ? (
                <>
                  {props.project.joinDemands.map((demand, index) => (
                    <div key={index}>
                      <div className="d-flex">
                        <div className="mr-3">
                          <Typography variant={'body1'} gutterBottom>
                            {demand.status === 'En attente' &&
                            <>
                              {demand.demander.firstName} aimerait vous rejoindre
                            </>
                            }
                            {demand.status === 'Acceptée' &&
                            <>
                              {demand.demander.firstName} vous a rejoint
                            </>
                            }
                          </Typography>
                        </div>
                        {demand.status === 'En attente' &&
                        <>
                          <div className="mr-3">
                            <CustomMaterialButton onClick={() => acceptDemand(demand)} text={'Accepter'} color={'primary'}/>
                          </div>
                          <div>
                            <CustomMaterialButton text={'Refuser'} color={'secondary'}/>
                          </div>
                        </>
                        }

                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>Le projet n'a pas encore de demande.</p>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

