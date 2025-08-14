import { Suspense } from 'react';
import HomePage from './components/Homepage';
import Footer from './components/Footer';


export default function Page() {
  return (
    <>
    <Suspense fallback={<div>Loading home page...</div>}>
      <HomePage/>
    </Suspense>
    <Footer/>
    </>
  );
}
