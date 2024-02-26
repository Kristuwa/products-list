import { FC } from "react"
import { Grid } from "react-loader-spinner";

export const Loader: FC = () => {
	return <Grid
visible={true}
height="80"
width="80"
color="#4fa94d"
ariaLabel="grid-loading"
radius="12.5"
wrapperStyle={{width: "400px", height: "400px", marginLeft: "auto", marginRight: "auto", marginTop: "80px" }}
wrapperClass="grid-wrapper"
/>};