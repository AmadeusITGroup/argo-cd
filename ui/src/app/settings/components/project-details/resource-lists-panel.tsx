import {AutocompleteField, FormField, Tooltip} from 'argo-ui';
import * as React from 'react';
import {FormApi} from 'react-form';

import {EditablePanel} from '../../../shared/components';
import {ApplicationDestination, ApplicationDestinationServiceAccount, GroupKind, Groups, Project, ProjectSpec, ResourceKinds} from '../../../shared/models';

function removeEl(items: any[], index: number) {
    return items.slice(0, index).concat(items.slice(index + 1));
}

function helpTip(text: string) {
    return (
        <Tooltip content={text}>
            <span style={{fontSize: 'smaller'}}>
                {' '}
                <i className='fas fa-info-circle' />
            </span>
        </Tooltip>
    );
}

type field = keyof ProjectSpec;

const infoByField: {[type: string]: {title: string; helpText: string}} = {
    clusterResourceWhitelist: {
        title: 'cluster resource allow list',
        helpText: 'Cluster-scoped K8s API Groups and Kinds which are permitted to be deployed'
    },
    clusterResourceBlacklist: {
        title: 'cluster resource deny list',
        helpText: 'Cluster-scoped K8s API Groups and Kinds which are not permitted to be deployed'
    },
    namespaceResourceWhitelist: {
        title: 'namespace resource allow list',
        helpText: 'Namespace-scoped K8s API Groups and Kinds which are permitted to deploy'
    },
    namespaceResourceBlacklist: {
        title: 'namespace resource deny list',
        helpText: 'Namespace-scoped K8s API Groups and Kinds which are prohibited from being deployed'
    }
};

function viewList(type: field, proj: Project) {
    const info = infoByField[type];
    const list = proj.spec[type] as Array<GroupKind>;
    return (
        <React.Fragment>
            <p className='project-details__list-title'>
                {info.title} {helpTip(info.helpText)}
            </p>
            {(list || []).length > 0 ? (
                <React.Fragment>
                    <div className='row white-box__details-row'>
                        <div className='columns small-4'>Kind</div>
                        <div className='columns small-8'>Group</div>
                    </div>
                    {list.map((resource, i) => (
                        <div className='row white-box__details-row' key={i}>
                            <div className='columns small-4'>{resource.kind}</div>
                            <div className='columns small-8'>{resource.group}</div>
                        </div>
                    ))}
                </React.Fragment>
            ) : (
                <p>The {info.title} is empty</p>
            )}
        </React.Fragment>
    );
}

const sourceReposInfoByField: {[type: string]: {title: string; helpText: string}} = {
    sourceRepos: {
        title: 'source repositories',
        helpText: 'Git repositories where application manifests are permitted to be retrieved from'
    }
};

function viewSourceReposInfoList(type: field, proj: Project) {
    const info = sourceReposInfoByField[type];
    const list = proj.spec[type] as Array<string>;
    return (
        <React.Fragment>
            <p className='project-details__list-title'>
                {info.title} {helpTip(info.helpText)}
            </p>
            {(list || []).length > 0 ? (
                <React.Fragment>
                    {list.map((repo, i) => (
                        <div className='row white-box__details-row' key={i}>
                            <div className='columns small-12'>{repo}</div>
                        </div>
                    ))}
                </React.Fragment>
            ) : (
                <p>The {info.title} is empty</p>
            )}
        </React.Fragment>
    );
}

const sourceNamespacesInfoByField: {[type: string]: {title: string; helpText: string}} = {
    sourceNamespaces: {
        title: 'source namespaces',
        helpText: 'Kubernetes namespaces where application resources are allowed to be created in'
    }
};

function viewSourceNamespacesInfoList(type: field, proj: Project) {
    const info = sourceNamespacesInfoByField[type];
    const list = proj.spec[type] as Array<string>;
    return (
        <React.Fragment>
            <p className='project-details__list-title'>
                {info.title} {helpTip(info.helpText)}
            </p>
            {(list || []).length > 0 ? (
                <React.Fragment>
                    {list.map((namespace, i) => (
                        <div className='row white-box__details-row' key={i}>
                            <div className='columns small-12'>{namespace}</div>
                        </div>
                    ))}
                </React.Fragment>
            ) : (
                <p>The {info.title} is empty</p>
            )}
        </React.Fragment>
    );
}

const destinationsInfoByField: {[type: string]: {title: string; helpText: string}} = {
    destinations: {
        title: 'destinations',
        helpText: 'Cluster and namespaces where applications are permitted to be deployed to'
    }
};

function viewDestinationsInfoList(type: field, proj: Project) {
    const info = destinationsInfoByField[type];
    const list = proj.spec[type] as Array<ApplicationDestination>;
    return (
        <React.Fragment>
            <p className='project-details__list-title'>
                {info.title} {helpTip(info.helpText)}
            </p>
            {(list || []).length > 0 ? (
                <React.Fragment>
                    <div className='row white-box__details-row'>
                        <div className='columns small-4'>Server</div>
                        <div className='columns small-8'>Namespace</div>
                    </div>
                    {list.map((destination, i) => (
                        <div className='row white-box__details-row' key={i}>
                            <div className='columns small-4'>{destination.server}</div>
                            <div className='columns small-8'>{destination.namespace}</div>
                        </div>
                    ))}
                </React.Fragment>
            ) : (
                <p>The {info.title} is empty</p>
            )}
        </React.Fragment>
    );
}

const destinationServiceAccountsInfoByField: {[type: string]: {title: string; helpText: string}} = {
    destinationServiceAccounts: {
        title: 'destination service accounts',
        helpText: 'DestinationServiceAccounts holds information about the service accounts to be impersonated for the application sync operation for each destination.'
    }
};

function viewDestinationServiceAccountsInfoList(type: field, proj: Project) {
    const info = destinationServiceAccountsInfoByField[type];
    const list = proj.spec[type] as Array<ApplicationDestinationServiceAccount>;
    return (
        <React.Fragment>
            <p className='project-details__list-title'>
                {info.title} {helpTip(info.helpText)}
            </p>
            {(list || []).length > 0 ? (
                <React.Fragment>
                    <div className='row white-box__details-row'>
                        <div className='columns small-4'>Server</div>
                        <div className='columns small-8'>Namespace</div>
                        <div className='columns small-12'>DefaultServiceAccount</div>
                    </div>
                    {list.map((destinationServiceAccounts, i) => (
                        <div className='row white-box__details-row' key={i}>
                            <div className='columns small-4'>{destinationServiceAccounts.server}</div>
                            <div className='columns small-8'>{destinationServiceAccounts.namespace}</div>
                            <div className='columns small-12'>{destinationServiceAccounts.defaultServiceAccount}</div>
                        </div>
                    ))}
                </React.Fragment>
            ) : (
                <p>The {info.title} is empty</p>
            )}
        </React.Fragment>
    );
}

function editList(type: field, formApi: FormApi) {
    const info = infoByField[type];

    return (
        <React.Fragment>
            <p className='project-details__list-title'>
                {info.title} {helpTip(info.helpText)}
            </p>
            <div className='row white-box__details-row'>
                <div className='columns small-4'>Kind</div>
                <div className='columns small-8'>Group</div>
            </div>
            {(formApi.values.spec[type] || []).map((_: Project, i: number) => (
                <div className='row white-box__details-row' key={i}>
                    <div className='columns small-4'>
                        <FormField
                            formApi={formApi}
                            field={`spec.${type}[${i}].kind`}
                            component={AutocompleteField}
                            componentProps={{items: ResourceKinds, filterSuggestions: true}}
                        />
                    </div>
                    <div className='columns small-8'>
                        <FormField formApi={formApi} field={`spec.${type}[${i}].group`} component={AutocompleteField} componentProps={{items: Groups, filterSuggestions: true}} />
                    </div>
                    <i className='fa fa-times' onClick={() => formApi.setValue(`spec.${type}`, removeEl(formApi.values.spec[type], i))} />
                </div>
            ))}
            <button className='argo-button argo-button--short' onClick={() => formApi.setValue(`spec.${type}`, (formApi.values.spec[type] || []).concat({group: '*', kind: '*'}))}>
                ADD RESOURCE
            </button>
        </React.Fragment>
    );
}

export const ResourceListsPanel = ({proj, saveProject, title}: {proj: Project; title?: React.ReactNode; saveProject?: (proj: Project) => any}) => (
    <EditablePanel
        save={saveProject}
        values={proj}
        view={
            <React.Fragment>
                {title}
                {Object.keys(infoByField).map(key => (
                    <React.Fragment key={key}>{viewList(key as field, proj)}</React.Fragment>
                ))}
                {!proj.metadata && Object.keys(sourceReposInfoByField).map(key => <React.Fragment key={key}>{viewSourceReposInfoList(key as field, proj)}</React.Fragment>)}
                {!proj.metadata &&
                    Object.keys(sourceNamespacesInfoByField).map(key => <React.Fragment key={key}>{viewSourceNamespacesInfoList(key as field, proj)}</React.Fragment>)}
                {!proj.metadata && Object.keys(destinationsInfoByField).map(key => <React.Fragment key={key}>{viewDestinationsInfoList(key as field, proj)}</React.Fragment>)}
                {!proj.metadata &&
                    Object.keys(destinationServiceAccountsInfoByField).map(key => (
                        <React.Fragment key={key}>{viewDestinationServiceAccountsInfoList(key as field, proj)}</React.Fragment>
                    ))}
            </React.Fragment>
        }
        edit={
            saveProject &&
            (formApi => (
                <React.Fragment>
                    {title}
                    {Object.keys(infoByField).map(key => (
                        <React.Fragment key={key}>{editList(key as field, formApi)}</React.Fragment>
                    ))}
                </React.Fragment>
            ))
        }
        items={[]}
    />
);
