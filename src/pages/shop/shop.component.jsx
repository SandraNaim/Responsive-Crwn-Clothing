import React, { lazy, Suspense } from "react";
import { Route } from "react-router";
import Spinner from "../../components/spinner/spinner.component";

const CollectionsOverview = lazy(() => import('../../components/collection-overview/collection-overview.component'));
const CollectionPage = lazy(() => import('../collection/collection.component'));


const ShopPage = ({ match }) => (
    <div className="shop-page">
        <Suspense fallback={<Spinner/>}>
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </Suspense>
    </div>
)


export default ShopPage