import React, { useState, useEffect } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import _ from 'lodash';
import LargeChip from './LargeChip';

export default ({ workflow, roleType }) => {
  const [activeRole, setActiveRole] = useState([]);
  let count = -1;
  useEffect(() => {
    setActiveRole(workflow?.WorkflowTeams?.map((wft, idx) => ({
      id: idx,
      team: wft.Team,
      issue: wft.issue ? wft.issue.split(',') : null,
    })));
  }, [workflow]);
  const issue = Object.keys(_.groupBy(activeRole, 'issue'));

  return (
    <div className="d-flex flex-column" style={{ height: '4.2rem' }}>
      <h1 style={{
        fontSize: 14, fontWeight: 'bold', color: '#8B95AB', marginBottom: 10,
      }}
      >Workflow
      </h1>
      <div className="d-flex justify-content-center align-items-center my-auto" style={{ gap: 5 }}>
        {!!activeRole?.length && roleType?.map(m => {
          const chipVal = activeRole.find(ar => (ar.issue ? ar.issue.includes(m.value) : null));
          count = chipVal ? count + 1 : count;
          return chipVal
            ? (
              <>
                {!!count && <ChevronRightIcon style={{ fontSize: 28 }} />}
                <LargeChip {...chipVal.team} status={m.name} color={`#${chipVal.team?.colour}`} />
              </>
            )
            : null;
        })}
        {((issue.length === 1 && issue[0] === 'null') || !activeRole?.length)
          && (<p className="h-100 my-auto">Please add team to workflow below</p>)}
      </div>
    </div>
  );
};
