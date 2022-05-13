import React from 'react';

import Layout from '../ui/base/layout';
import SEO from '../ui/base/seo';

import UploadAssignments from '../ui/Consultant/upload-assignments';

const UploadAssignmentsPage = () => (
	<Layout>
		<SEO title="Create Lecture" />
		<UploadAssignments />
	</Layout>
);

export default UploadAssignmentsPage;
