import { AnalysisModule } from "./analysis-module"
import { VehicleInfo } from "./VehiceInfo.tsx"
import { VehicleDetails } from "./VehicleDetails.tsx"

const MainModule =(props)=>{
    return(
        props.mainArray.map((ele)=>(
            <div className='first-div'>
            <VehicleInfo info={ele.info} />
            <div className='main-component-div'>
              <VehicleDetails makeObjectState={ele.makeObjectState} uniqueModelItems={ele.uniqueModelItems??ele.uniqueModelItems} />
              <AnalysisModule makeArrObj={ele.makeArrObj} />
            </div>
          </div>
        ))
       
    )
}
export default MainModule