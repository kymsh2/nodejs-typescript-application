import { Flex } from '@ag.ds-next/box';
import { DatePicker, DatePickerProps } from '@ag.ds-next/date-picker';
import { Fieldset } from '@ag.ds-next/fieldset';
import { FormStack } from '@ag.ds-next/form-stack';
import { TextInput } from '@ag.ds-next/text-input';
import * as React from 'react';
import { Component } from 'react';
import { RexResponseDetails } from './api';

export interface IIdentification {
	rexNumber?: string;
	status?: RexResponseDetails.ComplianceStatusEnum;
	lastAmendDate?: Date | undefined;
}

type IdentificationProps = IIdentification & {
	amend?: boolean;
	disabled?: boolean;
	onLastAmendDateChange: (day: Date | undefined) => void;
};

interface IdentificationState {}

class Identification extends React.Component<
	IdentificationProps,
	IdentificationState
> {
	state = {};
	render() {
		return (
			<Fieldset legend="REX Identification">
				<FormStack>
					<Flex flexDirection="row" gap={1}>
						<TextInput
							label="REX Number"
							id="rexNo"
							value={this.props.rexNumber}
							maxWidth="xl"
							disabled={this.props.disabled}
						/>

						<TextInput
							label="Status"
							id="status"
							value={this.props.status}
							maxWidth="xl"
							disabled={true}
						/>
					</Flex>
					{this.props.amend && (
						<DatePicker
							label="Last Amend Date"
							value={this.props.lastAmendDate}
							disabled={this.props.disabled}
							onChange={this.props.onLastAmendDateChange}
						/>
					)}
				</FormStack>
			</Fieldset>
		);
	}
}

export default Identification;
