import React from 'react';
import {classNames} from '../../../../utilities/css';
import styles from './Search.scss';

export interface SearchProps {
  /** Toggles whether or not the search is visible */
  visible?: boolean;
  /** The content to display inside the search */
  children?: React.ReactNode;
  /** Callback when the search is dismissed */
  onDismiss?(): void;
}

export class Search extends React.PureComponent<SearchProps, never> {
  private node = React.createRef<HTMLDivElement>();

  render() {
    const {visible, children} = this.props;

    const searchClassName = classNames(
      styles.Search,
      visible && styles.visible,
    );

    return (
      <React.Fragment>
        <div className={searchClassName}>
          <div className={styles.Overlay}>{children}</div>
        </div>
        <div
          className={styles.Backdrop}
          ref={this.node}
          onClick={this.handleDismiss}
        />
      </React.Fragment>
    );
  }

  private handleDismiss = ({target}: React.MouseEvent<HTMLElement>) => {
    const {onDismiss} = this.props;
    if (onDismiss != null && target === this.node.current) {
      onDismiss();
    }
  };
}
