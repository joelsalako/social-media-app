import PageContainer from '../../components/PageContainer';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <PageContainer title="Not Found">
      <p>Please, check the address.</p>
      <ul>
        <li>
          <Link to="/">Click here</Link> to go to the initial page.
        </li>
      </ul>
    </PageContainer>
  );
}
