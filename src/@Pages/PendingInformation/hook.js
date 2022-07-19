import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useHistory } from 'react-router-dom';

export default (props) => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (!!props.user && !['name', 'email', 'phone', 'OrganizationId'].map(attr => !!props.user[attr]).includes(false)) {
      return window.location = '/project';
    }
    setFirstName(props.user?.name ?? '');
    setPhone(props.user?.phone ?? '');
    setEmail(props.user?.email);
  }, [props.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName) return;
    if (!company) return;
    if (!password) return;
    const data = {
      name: !!lastName ? `${firstName} ${lastName}` : firstName,
      company,
      phone,
      password,
    };
    Api({
      endpoint: endpoints.updateUser(props.user?.id),
      data: { ...data, pending_info: 1 },
      onSuccess: () => {
        toast('success', 'Successfully Updated');
        props.setRefreshProfile(v => v + 1);
      },
      onFail: () => {
        toast('error', 'Failed to update user');
      },
    });
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    company,
    setCompany,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    passwordVisibility,
    setPasswordVisibility,
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
  };
};
