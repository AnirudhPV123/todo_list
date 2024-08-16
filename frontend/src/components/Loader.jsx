import { Bars } from "react-loader-spinner";

export default function Loader() {
  return (
    <Bars
      height="30"
      width="full"
      color="red"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    
    />
  );
}
