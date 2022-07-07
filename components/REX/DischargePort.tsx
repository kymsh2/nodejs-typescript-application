import { Fieldset } from '@ag.ds-next/fieldset';
import { FormStack } from '@ag.ds-next/form-stack';
import { TextInput } from '@ag.ds-next/text-input';
import * as React from 'react';
import { Component } from 'react';

export interface IDischargePort {
	value: string;
}
export type DischargePortProps = IDischargePort & {
	amend?: boolean;
	disabled?: boolean;
};

interface DischargePortState {}

class DischargePort extends React.Component<
	DischargePortProps,
	DischargePortState
> {
	state = {};
	render() {
		return (
			<FormStack>
				<TextInput
					label=""
					id="rexNo"
					value={this.props.value}
					maxWidth="xl"
					disabled={this.props.disabled}
					required={true}
				/>
			</FormStack>
		);
	}
}

export default DischargePort;
