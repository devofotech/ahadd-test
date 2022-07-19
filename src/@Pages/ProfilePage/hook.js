import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { db } from '@Configs/firebase';
import { ref, onChildAdded } from 'firebase/database';
import { sumBy } from '@Helpers';

export default (props) => {
  const { user_id } = useParams();
  const [activityLog, setActivityLog] = useState([]);
  const [cards, setCards] = useState();
  const [open, setOpen] = useState(false);
  const [assetById, setAssetById] = useState([]);
  const [currentPlan, setCurrentPlan] = useState();
  const [activePage, setActivePage] = useState(0);
  const [isLogUpdated, setIsLogUpdated] = useState(0);
  const [organizationData, setOrganizationData] = useState([]);
  const [totalUsage, setTotalUsage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isOrgUnlimited = props.user?.['Organization.StoreStorage.is_token_unlimited'];

  useEffect(() => {
    const notificationsRef = ref(db, 'notifications');
    onChildAdded(notificationsRef, () => setIsLogUpdated(prev => prev + 1));
  }, []);

  useEffect(() => {
    getCardList();
    getActivityLog();
    getAssetList();
  }, []);

  useEffect(() => {
    if (!props.user) return;
    getOrganizationAndCurrentPlan(props.user?.OrganizationId);
  }, [props.user]);

  const getOrganizationAndCurrentPlan = (id) => {
    Api({
      endpoint: endpoints.getOrganization(id),
      onSuccess: ({ data }) => {
        setOrganizationData(data);
        setCurrentPlan(data?.['StoreStorage.name']);
      },
      onFail: (err) => toast('error', err),
    });
  };

  const getActivityLog = () => {
    if (!user_id) return;
    Api({
      endpoint: endpoints.activityLog(),
      data: { Userid: user_id },
      onSuccess: ({ data }) => {
        setActivityLog(data);
      },
      onFail: () => { toast('error', 'Failed to get activity log data'); },
    });
  };

  const handleSetDefaultCard = (default_payment_method, ms) => setCardToDefault(default_payment_method, ms);

  const setCardToDefault = (default_payment_method, ms) => {
    const data = { default_payment_method };
    Api({
      endpoint: endpoints.changedefaultpaymentmethod(),
      data,
      onSuccess: () => {
        toast('success', 'Change Default Card Successfully');
        setOpen(false);
        getCardList();
        ms.fire('Saved!', '', 'success');
      },
      onFail: () => {
        toast('error', 'Failed to change default card');
      },
    });
  };
  const getCardList = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getCard(),
      data: { Userid: user_id },
      onSuccess: ({ data }) => {
        setCards(data);
      },
      onFail: () => { toast('error', 'Failed to get card data'); },
    });
  };
  const removeCard = (card_id, ms) => {
    const data = { card_id };
    Api({
      endpoint: endpoints.removeCard(),
      data,
      onSuccess: () => {
        toast('success', 'Remove Card Successfully');
        getCardList();
        ms.fire('Saved!', '', 'success');
      },
      onFail: () => {
        toast('error', 'Failed to remove card');
      },
    });
  };

  const getAssetList = () => {
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        setAssetById(_.groupBy(data, 'AssetTypeId'));
        setTotalUsage(sumBy(data, 'asset_size'));
        setIsLoading(false);
      },
      onFail: () => { toast('error', 'Failed to get asset data'); },
    });
  };

  return {
    activityLog,
    getCardList,
    cards,
    setCards,
    removeCard,
    open,
    setOpen,
    handleClickOpen,
    handleClose,
    handleSetDefaultCard,
    assetById,
    currentPlan,
    props,
    activePage,
    setActivePage,
    isLogUpdated,
    setIsLogUpdated,
    organizationData,
    totalUsage,
    isOrgUnlimited,
    isLoading,
  };
};
