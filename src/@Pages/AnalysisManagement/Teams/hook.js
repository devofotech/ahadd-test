/* eslint-disable max-params */
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook() {
  const [user, setUser] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getUsers(),
      data: { RoleId: 3 },
      onSuccess: ({ data }) => {
        setIsLoading(false);
        setUser(data);
      },
      onFail: () => { toast('error', 'Failed get user data'); },
    });
  };

  const getTeams = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getTeams(),
      onSuccess: ({ data }) => {
        setIsLoading(false);
        setTeams(data);
      },
      onFail: () => { toast('error', 'Failed get user data'); },
    });
  };

  useEffect(() => {
    getUsers();
    getTeams();
  }, []);

  const createTeam = (name, description, members, clearForm) => {
    if (!name) return;
    if (!members.length) return;
    const users = members.map(m => m.id).join(',');
    const data = { name, description, users };

    setIsLoading(true);
    Api({
      endpoint: endpoints.createTeam(),
      data,
      onSuccess: () => {
        setIsLoading(false);
        toast('success', 'Successfully create a new team.');
        clearForm();
        getUsers();
        getTeams();
      },
      onFail: () => {
        toast('error', 'Failed to create a team. Please try again later.');
        setIsLoading(false);
      },
    });
  };

  const deleteTeam = (id) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.deleteTeam(id),
      onSuccess: () => {
        setIsLoading(false);
        toast('success', 'Successfully delete the team.');
        getUsers();
        getTeams();
      },
      onFail: () => {
        toast('error', 'Failed to delete the team. Please try again later.');
        setIsLoading(false);
      },
    });
  };

  const updateTeam = (id, name, description, color, members) => {
    if (!id) return;
    const users = members.map(m => m.id).join(',');
    const data = {
      name, description, colour: color, users,
    };
    setIsLoading(true);
    Api({
      endpoint: endpoints.updateTeam(id),
      data,
      onSuccess: () => {
        setIsLoading(false);
        toast('success', 'Successfully create a new team.');
        getUsers();
        getTeams();
      },
      onFail: () => {
        toast('error', 'Failed to create a team. Please try again later.');
        setIsLoading(false);
      },
    });
  };
  return {
    user,
    teams,
    isLoading,
    createTeam,
    deleteTeam,
    updateTeam,
  };
}
