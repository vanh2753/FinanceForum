import { useState, useEffect } from "react"
import PostContent from "../../components/Forum/Post/PostConent"
import CommentList from "../../components/Forum/Comment/CommentList"
import { getPostData } from '../../api/forum/post-api'
import { useParams } from 'react-router-dom';
import CreateCommentArea from "../../components/Forum/Comment/CreateCommentArea";
const PostPage = () => {
    const { postId } = useParams();
    const [postData, setPostData] = useState({})

    const [refreshCommentList, setRefreshCommentList] = useState(1)

    const commentSuccess = () => {
        setRefreshCommentList(prev => prev + 1) // khi comment thành công thì thay đổi state refresh => render lai comment list
    }
    const fetchPostData = async () => {
        const res = await getPostData(postId)
        if (res.EC === 0) {
            setPostData(res.DT)
            //console.log(res.DT)
        }
    }
    useEffect(() => {
        fetchPostData()
    }, [postId])

    return (
        <div className="container">
            <PostContent postData={postData} />
            <CreateCommentArea commentSuccess={commentSuccess} />
            <CommentList refreshCommentList={refreshCommentList} />
        </div>
    )
}
export default PostPage