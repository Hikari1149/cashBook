import React from 'react';
import {Colors} from "../utility";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'
const ColorsArr=Object.keys(Colors).map(key=>{
    console.log(key);
    return Colors[key];
});
const CustomPieChart =( {title,categoryData}) =>{
    if(categoryData.length===0)
        return <h3 className="text-center mx-3">{title} 无数据</h3>
    return (
        <div className="pie-chart-component">
            <h3 className="text-center mt-3">{title}</h3>
            <ResponsiveContainer width={'100%'} height={300}>
                <PieChart>
                    <Pie
                        isAnimationActive={true}
                        data={categoryData}
                        dataKey="value"
                        cx='50%' cy='50%'
                        outerRadius={100} fill={Colors.blue} label
                    >
                        {
                            categoryData.map((entry, index) => <Cell key={index} fill={ColorsArr[index % ColorsArr.length]}/>)
                        }
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>

        </div>
    )
}
export default CustomPieChart;


