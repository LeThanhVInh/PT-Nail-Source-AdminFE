import HashLoader from 'react-spinners/HashLoader';
import './Loader.scss';

export default function Loader(props) {
  const { colorLoader, isLoading } = props;

  return (
    <div className="sweet-loading">
      <HashLoader
        color={colorLoader}
        loading={isLoading}
        size={100}
        speedMultiplier={3}
        aria-label="Loading"
        data-testid="loader"
      />
    </div>
  );
}
