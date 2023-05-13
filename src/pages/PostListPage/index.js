import Posts from '../../components/Posts';
import PageContainer from '../../components/PageContainer';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

export default function PostListPage() {
  const navigate = useNavigate();

  const handleAddPostClick = () => {
    navigate('/posts/add');
  };
  return (
    <PageContainer title="Posts">
      <Posts showOnlyPromoted={false} />
      <div className="add-post-button-container">
        <button onClick={handleAddPostClick}>Add Post</button>
      </div>
    </PageContainer>
  );
}
