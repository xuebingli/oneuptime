import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormLoader } from '../basic/Loader';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import ClickOutside from 'react-click-outside';
import ShouldRender from '../basic/ShouldRender';
import { closeModal } from 'CommonUI/actions/modal';
import { cancelScheduledEvent } from '../../actions/scheduledEvent';
import { history, RootState } from '../../store';

interface CancelScheduleProps {
    closeThisDialog: Function;
    isRequesting?: boolean;
    cancelError?: string;
    closeModal?: Function;
    cancelScheduledEvent?: Function;
    modalId?: string;
    slug?: string;
    data?: object;
}

class CancelSchedule extends Component<ComponentProps> {
    override componentDidMount() {
        window.addEventListener('keydown', this.handleKeyBoard);
    }

    override componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyBoard);
    }

    handleKeyBoard = (e: $TSFixMe) => {
        switch (e.key) {
            case 'Escape':

                return this.props.closeThisDialog();
            case 'Enter':
                return this.handleCancel();
            default:
                return false;
        }
    };

    handleCancel = () => {

        const { cancelScheduledEvent, closeModal, modalId, data }: $TSFixMe = this.props;
        const { projectId, eventId }: $TSFixMe = data;

        const redirect:string: $TSFixMe = `/dashboard/project/${this.props.slug}/scheduledEvents`;

        cancelScheduledEvent(
            projectId,
            eventId,
            history,
            redirect,
            closeModal,
            modalId
        );
    };

    override render() {

        const { isRequesting, closeThisDialog, cancelError }: $TSFixMe = this.props;
        return (
            <div className="ModalLayer-wash Box-root Flex-flex Flex-alignItems--flexStart Flex-justifyContent--center">
                <div
                    className="ModalLayer-contents"
                    tabIndex={-1}
                    style={{ marginTop: 40 }}
                >
                    <div className="bs-BIM">
                        <div className="bs-Modal bs-Modal--large">
                            <ClickOutside onClickOutside={closeThisDialog}>
                                <div className="bs-Modal-header">
                                    <div className="bs-Modal-header-copy">
                                        <span className="Text-color--inherit Text-display--inline Text-fontSize--20 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                            <span>Confirm Cancellation</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="bs-Modal-content">
                                    <span className="Text-color--inherit Text-display--inline Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                        Are you sure you want to cancel this
                                        scheduled event ?
                                    </span>
                                </div>
                                <div className="bs-Modal-footer">
                                    <div className="bs-Modal-footer-actions">
                                        <ShouldRender
                                            if={!isRequesting && cancelError}
                                        >
                                            <div
                                                id="cancelError"
                                                className="bs-Tail-copy"
                                            >
                                                <div
                                                    className="Box-root Flex-flex Flex-alignItems--stretch Flex-direction--row Flex-justifyContent--flexStart"
                                                    style={{
                                                        marginTop: '10px',
                                                    }}
                                                >
                                                    <div className="Box-root Margin-right--8">
                                                        <div className="Icon Icon--info Icon--color--red Icon--size--14 Box-root Flex-flex"></div>
                                                    </div>
                                                    <div className="Box-root">
                                                        <span
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            {cancelError}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </ShouldRender>
                                    </div>
                                    <div className="bs-Modal-footer-actions">
                                        <button
                                            className="bs-Button bs-DeprecatedButton bs-Button--grey btn__modal"
                                            type="button"
                                            onClick={closeThisDialog}
                                            id="cancelCancelScheduleBtn"
                                        >
                                            <span>Cancel</span>
                                            <span className="cancel-btn__keycode">
                                                Esc
                                            </span>
                                        </button>
                                        <button
                                            id="deleteScheduleModalBtn"
                                            className="bs-Button bs-DeprecatedButton bs-Button--red btn__modal"
                                            type="button"
                                            onClick={this.handleCancel}
                                            disabled={isRequesting}
                                            autoFocus={true}
                                        >
                                            {!isRequesting && (
                                                <>
                                                    <span>Proceed</span>
                                                    <span className="delete-btn__keycode">
                                                        <span className="keycode__icon keycode__icon--enter" />
                                                    </span>
                                                </>
                                            )}
                                            {isRequesting && <FormLoader />}
                                        </button>
                                    </div>
                                </div>
                            </ClickOutside>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


CancelSchedule.displayName = 'CancelSchedule';


CancelSchedule.propTypes = {
    closeThisDialog: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool,
    cancelError: PropTypes.string,
    closeModal: PropTypes.func,
    cancelScheduledEvent: PropTypes.func,
    modalId: PropTypes.string,
    slug: PropTypes.string,
    data: PropTypes.object,
};

const mapStateToProps: Function = (state: RootState) => {
    return {
        isRequesting: state.scheduledEvent.cancelScheduledEvent.requesting,
        cancelError: state.scheduledEvent.cancelScheduledEvent.error,
        modalId: state.modal.modals[0].id,
        slug: state.project.currentProject && state.project.currentProject.slug,
    };
};

const mapDispatchToProps: Function = (dispatch: Dispatch) => bindActionCreators({ closeModal, cancelScheduledEvent }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CancelSchedule);