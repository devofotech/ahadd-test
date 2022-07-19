import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { primaryColor } from '@Assets/css/index';
import Card from '@Components/CustomCard3';
import { pluralizer } from '@Helpers';
import ModuleData from './components/ModuleData';

export default (h) => {
  return (
    <Grid xs={3} item className="d-flex flex-column" style={{ height: '84vh' }}>
      <div className="d-flex align-items-center" style={{ flex: '0 0 auto', marginBottom: '1vh' }}>
        <Link to="/module-management">
          <KeyboardArrowLeft
            style={{
              color: '#FFFFFF',
              fontSize: 30,
              background: primaryColor,
              padding: '6px 1px',
              borderRadius: 10,
            }}
          />
        </Link>
        <h2 style={{ marginLeft: 10 }} className="color-primary">Module {pluralizer('Detail', h.modules.length)}</h2>
      </div>
      <div
        className="hide-scroll"
        style={{
          flex: '0 1 auto', overflowY: 'auto', paddingInline: 10,
        }}
      >
        {!h.isCreate
          && (
            <Card
              extraGrid
              selected
              isToTheSide={12}
              adjustStyle={{ height: '29rem' }}
              children={(
                <ModuleData
                  data={h.modules?.find(md => md.id === Number(h.module_id))}
                  selectedParameter={h.parameterList[h.module_id]}
                  {...h}
                />
              )}
            />
          )}
        {h.modules
          .filter(md => md.id !== Number(h.module_id) && !md.is_general)
          .map(m => (
            <Card
              extraGrid
              isToTheSide={12}
              children={<ModuleData data={m} selectedParameter={h.parameterList[m.id]} {...h} />}
              adjustStyle={{ height: '29rem' }}
            />
          ))}
      </div>
    </Grid>
  );
};
