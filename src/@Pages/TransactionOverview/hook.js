import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';


export default ({ user }) => {
  const [status, setStatus] = useState('');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(30);
  const [totalData, setTotalData] = useState(100);

  const handleChangeFilter = (e) => {
    const search = e.toString().split('-');
    setFilter(`status,${status},id,${search[0]},PaymentId,${search[1]},UserId,${search[2]}`)
  }

  const getTransactions = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getTransactionHistory(),
      data: {
        perpage, page, sortby: 'createdAt,DESC', filter: `${filter}${filter.length ? ',' : ''}UserId,${user?.id}`,
      },
      onSuccess: (res) => {
        setTransactions(res.data);
        setTotalData(res.total);
        setIsLoading(false);
      },
      onFail: () => {
        toast('error', 'Failed get transaction list');
      },
    });
  }

  useEffect(() => {
    getTransactions();
  }, [page, filter, keyword, status, user?.id])

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') getTransactions();
  };
  return {
    status,
    setStatus,
    reference,
    setReference,
    description,
    setDescription,
    type,
    setType,
    amount,
    setAmount,
    transactions,
    onKeyDown,
    keyword,
    setKeyword,
    filter,
    setFilter,
    handleChangeFilter,
    isLoading,
  }
}