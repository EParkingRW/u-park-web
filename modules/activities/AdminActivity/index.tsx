import GarageOrCompanyView from "../_Parties/garageOrCompany/GarageOrCompanyView";

const AdminActivity = () => {
    return(
        <div className={"flex gap-2 justify-between"}>
            <GarageOrCompanyView isAdmin={true}/>
        </div>
    )
}

export default AdminActivity