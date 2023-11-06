import * as React from 'react';

interface BoxLinkProps extends React.ComponentPropsWithoutRef<'a'> { }

export const BoxLink = React.forwardRef<HTMLAnchorElement, BoxLinkProps>(function BoxLink(
	{ className, ...props },
	forwardedRef
) {
	return <a ref={forwardedRef} className={className} {...props} />;
});