import { getDataForSection } from "../../api/forum/post-api"
import ForumPreviewBlock from "./ForumPreviewBlock"
import { useEffect, useState } from "react"
const ForumPreviewSection = () => {
    const [sectionData, setSectionData] = useState([])

    const fetchData = async () => {
        const res = await getDataForSection()
        if (res.EC === 0) {
            setSectionData(res.DT)
            //console.log(res.DT)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='section-container container d-flex flex-column pb-5 '>
            <ForumPreviewBlock topicsData={sectionData} />
        </div>
    )
}

export default ForumPreviewSection