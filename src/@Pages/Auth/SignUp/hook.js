/* eslint-disable complexity */
import { useState, useEffect } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

export default (props) => {
  const { plan, mode } = queryString.parse(window.location.search);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState();
  const [cardExpDate, setCardExpDate] = useState('');
  const [cvc, setCvc] = useState();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [isSuccessCreated, setIsSuccessCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [loginAuth, setLoginAuth] = useState({ email: null, password: null });
  const [isTaken, setIsTaken] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const history = useHistory();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsProductLoading(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setProducts(data.products_storage ?? []);
        setIsProductLoading(false);
      },
      onFail: () => { console.log('error'); setIsProductLoading(false); },
    });
  };

  useEffect(() => {
    if (!plan) return;
    if (!products?.length) return;
    const sprod = products.find(f => f.product_id === plan);
    if (sprod) setSelectedProduct(sprod);
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName) return;
    if (!lastName) return;
    if (!email) return;
    if (!password) return;
    if (!company) return;
    const data = {
      name: `${firstName} ${lastName}`,
      company,
      email,
      password,
    };
    if (!!selectedProduct) {
      const exp_month = cardExpDate.substring(0, cardExpDate.length - 7);
      const year = cardExpDate.substring(5).replace(/\s/g, '');
      const source = {
        object: 'card',
        number: cardNumber.replace(/\s/g, ''),
        name: `${firstName} ${lastName}`,
        exp_month,
        exp_year: year.length > 2 ? year : `20${year}`,
        cvc,
      };
      if (Object.keys(source).map(k => !!source[k]).includes(false)) return;
      data.with_plan = { plan_id: plan, mode, source };
    }
    setIsLoading(true);
    Api({
      endpoint: endpoints.register(),
      data,
      isSignUp: true,
      onSuccess: () => {
        setIsLoading(false);
        setIsSuccessCreated(true);
        setLoginAuth({ email: data.email, password: data.password });
      },
      onFail: () => {
        setIsTaken(true);
        setIsLoading(false);
        toast('error', 'Failed to register user');
      },
    });
  };

  return {
    plan,
    mode,
    selectedProduct,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    company,
    setCompany,
    email,
    setEmail,
    password,
    setPassword,
    cardName,
    setCardName,
    cardNumber,
    setCardNumber,
    cardExpDate,
    setCardExpDate,
    cvc,
    setCvc,
    handleSubmit,
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
    passwordVisibility,
    setPasswordVisibility,
    isSuccessCreated,
    loginAuth,
    isLoading,
    isProductLoading,
    isTaken,
    setIsTaken,
  };
};
