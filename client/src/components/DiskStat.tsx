import { useContext, useEffect, useState } from "react";
import { getDiskStat } from "../api/handleRequest";
import { PathContext } from "../context/PathContext";
import { DiskStat } from "../interfaces/DiskStat";
import { useDataContext } from "../context/DataContext";
import { convertDiskSize } from '../utils/ConvertSize'

import '../styles/DiskStat.css'

interface DiskStatProps {
    Icon: string;
    Text: string;
};

const Disk = (opt: DiskStatProps) => {
    const { pathValue } = useContext(PathContext);
    const [ diskStat, setDiskStat ] = useState<DiskStat | null>(null);
    const { diskFlag } = useDataContext();
    let stat: DiskStat

    useEffect(() => {
        const fetchDiskStat = async () => {
            try {
                stat = await getDiskStat(pathValue)
                setDiskStat(stat);
            }catch(error){
                console.log(error)
            }
        };
        fetchDiskStat();
    },[diskFlag])

    let percentage = 0; 
    if (diskStat) {
        percentage = (diskStat.Used / diskStat.Total) * 100;
    }
    let used;
    let total;
    if (diskStat?.Total && diskStat.Used) {
        used = convertDiskSize(diskStat?.Used);
        total = convertDiskSize(diskStat.Total);
    }

    return (
        <div className="diskstat-cont">
            <div className="icon-and-text">
                <span className="icon-disk"><i className={opt.Icon}></i></span>
                <span className="text-disk">{opt.Text}</span>
            </div>
            <div className="progress-bar">
                <progress className="progress" value={percentage} max={100}></progress> 
                <div className="used-disk-cont">
                    <span className="used-disk">{`${used} de ${total} usado`}</span> 
                </div>
            </div>
        </div>
    )
}

export default Disk;