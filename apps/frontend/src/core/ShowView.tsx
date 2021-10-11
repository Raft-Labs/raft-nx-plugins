import { useRouter } from 'next/dist/client/router';
import React from 'react';

const ShowView = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div></div>;
};

export default ShowView;
