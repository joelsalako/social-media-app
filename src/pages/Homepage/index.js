import PageContainer from '../../components/PageContainer';
import Posts from '../../components/Posts';

export default function Homepage() {
  return (
    <PageContainer title="Welcome to My App">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget neque
        id elit hendrerit malesuada. Aenean rutrum id justo at consequat.
        Maecenas lacinia elementum mi vitae feugiat. Sed finibus justo non purus
        sollicitudin auctor. Sed pharetra placerat nisi a vestibulum. In ut
        tellus arcu. Suspendisse eget tortor non purus varius aliquet. Etiam
        semper urna sapien, sit amet rhoncus augue pulvinar id. Donec at commodo
        magna. Sed aliquet elit eros, eu gravida eros sodales ac. Nunc et
        placerat mauris. Praesent vehicula pharetra risus id ultricies. Donec in
        sollicitudin tortor.
      </p>
      <p>
        <strong>
          Sed eu augue in eros hendrerit ultricies. Donec iaculis magna ut
          congue pellentesque. Etiam sed arcu faucibus, ornare magna vitae,
          rutrum erat. Cras porta semper odio ac auctor. Vestibulum maximus
          pretium pharetra.
        </strong>
      </p>
      <h2>Promoted Posts</h2>
      <Posts showOnlyPromoted={true} />
    </PageContainer>
  );
}
