import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Create: NextPage = () => {
  const router = useRouter();
  console.log(router);

  return <div>create</div>;
};

export default Create;
