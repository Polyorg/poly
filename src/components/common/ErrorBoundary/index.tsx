import * as Sentry from '@sentry/browser';
import React, { PropsWithChildren } from 'react';

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends React.Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error });
    Sentry.withScope((scope) => {
      const component = Object.values(errorInfo)[0]?.split(' ')[5];
      if (component) {
        scope.setTag('Component', component);
      }
      Object.keys(errorInfo).forEach((key: string) => {
        scope.setExtra(key, errorInfo[key as keyof React.ErrorInfo]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state?.error) {
      return <div>Error rendering component: {this.state?.error.message}</div>;
    }
    return this.props.children;
  }
}
