/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable complexity */
import { useState, useEffect } from 'react';
import {
  Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent,
} from '@material-ui/lab';
import { IconButton } from '@material-ui/core';
import { Description } from '@material-ui/icons';
import _ from 'lodash';
import moment from 'moment';
import AvatarIcon from '@Components/AvatarIcon';

export default ({
  issues, selectedIssueId, setSelectedIssueId, setSelectedSequenceId, getTeam = () => null, team, currentUser, ...h
}) => {
  const [initOptions, setInitOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const sortedStoredReports = _.orderBy(h?.StoredReports, ['createdAt'], ['asc']);
  const seqSeverities = {
    inprogress: 1,
    onhold: 2,
    resolved: 4,
  };
  const allowedIssue = [];

  useEffect(() => {
    if (!issues) return;
    const excludedOpen = issues.slice(1);
    const excludedSelectedIssue = Object.keys(_.groupBy(h.StoredReports, 'IssueId'));
    const selectedOptions = excludedOpen.filter(({ id, sequence_id }) => !excludedSelectedIssue.includes(id) && id !== null && sequence_id !== 3);
    setOptions(selectedOptions);
    setInitOptions(selectedOptions);
  }, [issues]);

  useEffect(() => {
    if (!currentUser.TeamId) return;
    getTeam(currentUser.TeamId);
  }, [currentUser]);

  useEffect(async () => {
    if (!team.id) return;
    if (!currentUser.TeamId) return;
    const teamIssue = team?.WorkflowTeams[0]?.issue.split(',');
    teamIssue.map(m => m !== 'open' && allowedIssue.push(seqSeverities[m]));
    const selectedOptions = issues.filter(({ sequence_id }) => allowedIssue.includes(sequence_id));
    setOptions(selectedOptions);
    setInitOptions(selectedOptions);
  }, [issues, team]);

  const handleClick = (id, sequence_id) => {
    if (selectedIssueId === id) {
      setOptions(initOptions);
      setSelectedIssueId(0);
      setSelectedSequenceId(0);
      return;
    }
    setSelectedIssueId(id);
    setSelectedSequenceId(sequence_id);
    setOptions(options.filter(f => f.id === id));
  };

  const StatusDescription = ({
    isOpen = false, isLast = false, index, storedLength, ...props
  }) => {
    const report = isOpen ? h : props;
    const status = isOpen ? 'Open' : issues.filter(f => f.id === props.IssueId)[0]?.name;
    return (
      <TimelineItem>
        <TimelineOppositeContent style={{ maxWidth: '0.5px', paddingLeft: '0px', paddingRight: '0px' }} />
        <TimelineSeparator>
          {isOpen ?? <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />}
          <AvatarIcon
            user={report.User}
            size="1.5rem"
            fontSize="11px"
            style={{ border: '2px solid white', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)' }}
          />
          {(isOpen && !!h.StoredReports?.length) && <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />}
          {index < (storedLength - 1) && <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />}
          {(!isLast && !h.is_close) && <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />}
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }} className="mb-4">
          <div className="d-flex justify-content-between">
            <p style={{ fontSize: 14, fontWeight: 'bold' }}>{report.User.name}&nbsp;
              <text style={{ color: 'grey', fontWeight: 'normal', textAlign: 'right' }}>
                {isOpen ? 'open the Inspection' : `set the status to ${status}`}
              </text>
            </p>
            <p style={{ fontSize: 14, color: 'grey' }}>{moment(report.createdAt).format('D MMM YYYY')}</p>
          </div>
          <p className="py-1" style={{ color: 'black' }}>{ report.name || (status === 'Open' ? report.description : 'No Description')}</p>
          {!!props.path && <FilesList fileList={props.path} />}
          <p style={{ fontSize: 13, color: 'grey' }}>Status: {status}</p>
        </TimelineContent>
      </TimelineItem>
    );
  };

  const FilesList = ({ fileList }) => {
    const files_array = fileList.split(',');
    return (
      <div className="d-flex mt-1 mb-2 overflow-auto" style={{ gap: 10 }}>
        {files_array.map(path => (
          <IconButton
            className="p-1"
            style={{ border: '1px solid var(--active-color)', borderRadius: 5, cursor: 'pointer' }}
            onClick={() => window.open(`${process.env.REACT_APP_S3}/${path}`)}
          >
            <Description style={{ color: 'var(--active-color)' }} />
          </IconButton>
        ))}
      </div>
    );
  };
  return (
    <Timeline position="left" className="pt-4">
      <StatusDescription isOpen />
      {!!h.StoredReports?.length && sortedStoredReports.map((r, i) => (
        <StatusDescription index={i} storedLength={h.StoredReports.length} isLast={h.StoredReports.length === i} {...r} />
      ))}
      {!h.is_close && (
        <TimelineItem style={{ minHeight: '2.5rem' }}>
          <TimelineOppositeContent style={{ maxWidth: '0.5px', paddingLeft: !!team.id ? 0 : '0.15rem', paddingRight: 0 }} />
          <TimelineSeparator>
            {!!team.id ? (
              <AvatarIcon
                user={team}
                size="1.5rem"
                fontSize="11px"
                colorType="inherit"
                backgroundColor={`#${team.colour}`}
                style={{ border: '2px solid white', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)' }}
              />
            ) : (
              <TimelineDot variant="outline" />
            )}
          </TimelineSeparator>
          <TimelineContent sx={{ py: '6px', px: 2 }}>
            <div className="d-flex justify-content-between" style={{ gap: 10, marginTop: -5, marginBottom: -10 }}>
              {options.map(m => (
                <div
                  className="py-1 text-center"
                  style={{
                    border: '1.5px solid var(--primary-color)',
                    borderRadius: 2,
                    backgroundColor: selectedIssueId === m.id ? 'var(--active-color)' : 'white',
                    flex: 1,
                    color: selectedIssueId === m.id && 'white',
                    cursor: 'pointer',
                    boxShadow: '1.5px 0px 5px rgba(3, 166, 154, 0.4)',
                    transition: 'all .75s',
                  }}
                  onClick={() => handleClick(m.id, m.sequence_id)}
                >
                  {m.name}
                </div>
              ))}
            </div>
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
};
