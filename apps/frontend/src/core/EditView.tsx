import { useRouter } from 'next/dist/client/router';
import React from 'react';

const EditView = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div></div>;
};

export default EditView;
