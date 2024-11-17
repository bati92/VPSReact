import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Button from '@ui/button';

export async function getStaticProps() {
	return { props: { className: 'template-color-1' } };
}

const ErrorPage = () => (
	<Wrapper>
		<SEO pageTitle="404" />
	
		<div className="rn-not-found-area rn-section-gapTop">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="rn-not-found-wrapper">
							<h2 className="large-title">404</h2>
							<h3 className="title">الصفحة غير موجودة!</h3>
							<Button path="/">العودة الى الموقع</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	
	</Wrapper>
);

export default ErrorPage;
