import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chip from '@mui/joy/Chip';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { RootState } from '../redux/rootReducer';

export interface Task {
  id: number;
  description: string;
  types: string[];
  completed: boolean;
}

interface DashboardProps {
  // Add props if needed
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const tasks = useSelector((state: RootState) => state.config.tasks);
  const [totalTasks, setTotalTasks] = useState<number | undefined>(undefined);
  const [completedTasks, setCompletedTasks] = useState<number | undefined>(undefined);
  const [workTasks, setWorkTasks] = useState<number | undefined>(undefined);
  const [wellnessTasks, setWellnessTasks] = useState<number | undefined>(undefined);
  const [personalTasks, setPersonalTasks] = useState<number | undefined>(undefined);
  const [learningTasks, setLearningTasks] = useState<number | undefined>(undefined);

  useEffect(() => {
    let work = 0;
    let wellness = 0;
    let personal = 0;
    let learning = 0;
    let completed = 0;

    tasks.forEach((task: Task) => {
      // Assert that task.types is of type Type[]
      if(task.completed === true){
        completed++;
      }
      task.types?.forEach((type: string) => {
        if (type === 'work') {
          work++;
        } else if (type === 'wellness') {
          wellness++;
        } else if (type === 'personal') {
          personal++;
        } else if (type === 'learning') {
          learning++;
        }
      });
    });

    setWorkTasks(work);
    setWellnessTasks(wellness);
    setPersonalTasks(personal);
    setLearningTasks(learning);
    setCompletedTasks(completed);
    setTotalTasks(tasks.length - completed);
  }, [tasks]);

  const renderPieChart = () => {
    // Check if Taskscription counts are defined before using them in the data array
    if (workTasks === undefined || wellnessTasks === undefined || personalTasks === undefined || learningTasks === undefined) {
      return null;
    }

    let data = [
      { id: 0, value: workTasks, label: 'Work', color: '#9a5b13' },
      { id: 1, value: wellnessTasks, label: 'Wellness', color: '#0b6bcb' },
      { id: 2, value: personalTasks, label: 'Personal', color: '#c41c1c' },
      { id: 3, value: learningTasks, label: 'Learning', color: '#5A5A72' },
    ];

    return (
      <div
        style={{
          width: '90%',
          height: '90%',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          marginTop: '40px',
        }}
      >
        <PieChart
          series={[
            {
              data: data,
              innerRadius: 20,
              outerRadius: 55,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 180,
            },
          ]}
          sx={{
            '--ChartsLegend-rootOffsetX': '-10px',
            '--ChartsLegend-rootOffsetY': '-10px',
            marginRight: '50px',
          }}
        />
      </div>
    );
  };

  const renderLineChart = () => {
    const uData = [1, 5, 10, 25, 100];
    const xLabels = ['Jan', 'Apr', 'Jul', 'Oct', 'Dec'];

    return (
      <div
        style={{
          width: '100%',
          height: '90%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          boxSizing: 'border-box',
        }}
      >
        <LineChart
          width={590}
          height={230}
          series={[{ data: uData, area: true }]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          sx={{
            '& .MuiLineElement-root': {
              strokeWidth: 4,
            },
            '& .MuiMarkElement-root': {
              display: 'none',
            },
          }}
        />
      </div>
    );
  };

  return (
    <div className='Page-container'>
      <h1>Dashboard</h1>
      <div className='Dashboard-container'>
        <div
          className='Dashboard-card'
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <h3 style={{ position: 'absolute', left: '32px', top: '8px' }}>Performance</h3>
          <div className='Dashboard-card-content'>
            <h1 style={{ margin: '0' }}>{totalTasks}</h1>
            <p style={{ margin: '0' }}>Tasks Active</p>
          </div>
          <div className='Dashboard-card-content'>
            <h1 style={{ margin: '0' }}>{completedTasks}</h1>
            <p style={{ margin: '0' }}>Tasks Completed</p>
          </div>
          <div className='Dashboard-card-content'>
            <h1 style={{ margin: '0' }}>{tasks.length}</h1>
            <p style={{ margin: '0' }}>Tasks Logged</p>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', gap: '32px', justifyContent: 'space-between' }}>
          <div className='Dashboard-card'>
            <h3 style={{ position: 'absolute', left: '32px', top: '8px' }}>Task Breakdown</h3>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {renderPieChart()}
            </div>
          </div>
          <div className='Dashboard-card'>
            <h3 style={{ position: 'absolute', left: '32px', top: '8px' }}>Productivity</h3>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {renderLineChart()}
            </div>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', gap: '32px', justifyContent: 'space-between' }}>
          <div className='Dashboard-card'>
            <Chip
              style={{ position: 'absolute', top: '16px', left: '16px' }}
              className='Dashboard-chip'
              color='warning'
              variant='solid'
            >
              Work
            </Chip>
            <div className='Dashboard-card-content'>
              <h1 style={{ margin: '0' }}>{workTasks}</h1>
              <p style={{ margin: '0' }}>tasks</p>
            </div>
          </div>
          <div className='Dashboard-card'>
            <Chip
              style={{ position: 'absolute', top: '16px', left: '16px' }}
              color='primary'
              variant='solid'
            >
              Wellness
            </Chip>
            <div className='Dashboard-card-content'>
              <h1 style={{ margin: '0' }}>{wellnessTasks}</h1>
              <p style={{ margin: '0' }}>tasks</p>
            </div>
          </div>
          <div className='Dashboard-card'>
            <Chip
              style={{ position: 'absolute', top: '16px', left: '16px' }}
              color='danger'
              variant='solid'
            >
              Personal
            </Chip>
            <div className='Dashboard-card-content'>
              <h1 style={{ margin: '0' }}>{personalTasks}</h1>
              <p style={{ margin: '0' }}>tasks</p>
            </div>
          </div>
          <div className='Dashboard-card'>
            <Chip
              style={{ position: 'absolute', top: '16px', left: '16px' }}
              color='neutral'
              variant='solid'
            >
              Learning
            </Chip>
            <div className='Dashboard-card-content'>
              <h1 style={{ margin: '0' }}>{learningTasks}</h1>
              <p style={{ margin: '0' }}>tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
