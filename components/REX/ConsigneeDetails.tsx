import { Fieldset } from '@ag.ds-next/fieldset';
import { FormStack } from '@ag.ds-next/form-stack';
import { TextInput } from '@ag.ds-next/text-input';
import * as React from 'react';
import { Component } from 'react';
import Address, { IAddress } from './Address';
import { Address as APIAddress } from './api';

export interface IConsigneeDetails {
	consigneeName?: string;
	consigneeAddress?: APIAddress;
	consigneePhoneNumber?: string;
	consigneeRepresentative?: string;
}
type ConsigneeDetailsProps = IConsigneeDetails & {
	amend?: boolean;
	disabled?: boolean;
};

interface ConsigneeDetailsState {}

class ConsigneeDetails extends React.Component<
	ConsigneeDetailsProps,
	ConsigneeDetailsState
> {
	state = {};
	render() {
		return (
			<Fieldset legend="Consignee Details">
				<FormStack>
					<TextInput
						label="Consignee Name"
						id="consigneeName"
						value={this.props.consigneeName}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
					<Address
						label="Consignee Address"
						address={this.props.consigneeAddress}
						disabled={this.props.disabled}
					/>
					<TextInput
						label="Consignee Phone Number"
						id="consigneePhoneNumber"
						value={this.props.consigneePhoneNumber}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
					<TextInput
						label="Consignee Representative"
						id="consigneeRepresentative"
						value={this.props.consigneeRepresentative}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
				</FormStack>
			</Fieldset>
		);
	}
}

export default ConsigneeDetails;
