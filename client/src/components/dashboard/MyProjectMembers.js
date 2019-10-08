import React from 'react';

export default function MyProjectMembers(props) {
  return (
      <>
        {props.project &&
        <>
          <p>{props.project.initiator.firstName} (vous) - {props.project.initiator.email}</p>
          {props.project.members.filter(member => member['@id'] !== props.project.initiator['@id']).map((member, index) => (
            <p key={index}>{member.firstName} - {member.email}</p>
          ))}
        </>
        }
      </>
  );
}
