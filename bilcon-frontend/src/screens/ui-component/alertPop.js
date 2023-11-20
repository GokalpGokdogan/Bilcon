
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';

function AlertPop({errorCode}) {
    //Change a few things up and try submitting again.
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">Error Alert!</span> 
      {errorCode}
    </Alert>
  );
}
export default AlertPop;