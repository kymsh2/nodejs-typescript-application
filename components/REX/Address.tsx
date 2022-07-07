import { Fieldset } from '@ag.ds-next/fieldset';
import { FormStack } from '@ag.ds-next/form-stack';
import { TextInput } from '@ag.ds-next/text-input';
import * as React from 'react';
import { Component } from 'react';
import { Address as APIAddress } from './api';

export interface IAddress {
	streetAddress1?: string;
	streetAddress2?: string;
	streetAddress: {
		//"$ref": "#/components/schemas/streetAddress"
		streetLines: {
			type: 'array';
			items: {
				type: 'string';
			};
		};
	};
	city?: string;
	state?: string;
	postalCode?: string;
	country?: string;
}

type AddressProps = {
	address?: APIAddress;
	label: string;
	amend?: boolean;
	disabled?: boolean;
};

interface AddressState {}

class Address extends React.Component<AddressProps, AddressState> {
	state = {};

	renderStreetAddress() {
		console.log(
			'rendering street address: ' +
				this.props.address?.streetAddress?.streetLines?.length
		);
		if (this.props.address?.streetAddress?.streetLines != undefined) {
			return this.props.address?.streetAddress.streetLines.map(
				(stLine, index) => {
					return (
						<TextInput
							label={'Street Address ' + (index + 1)}
							id={'streetAddress' + (index + 1)}
							key={'streetAddress' + (index + 1)}
							value={stLine}
							maxWidth="xl"
							disabled={this.props.disabled}
						/>
					);
				}
			);
		}
	}

	render() {
		return (
			<Fieldset legend={this.props.label}>
				<FormStack>
					{this.renderStreetAddress()}

					<TextInput
						label="City"
						id="city"
						value={this.props.address?.city}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
					<TextInput
						label="State"
						id="state"
						value={this.props.address?.state}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
					<TextInput
						label="Postal Code"
						id="postalCode"
						value={this.props.address?.postalCode}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
					<TextInput
						label="Country"
						id="country"
						value={this.props.address?.country}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
				</FormStack>
			</Fieldset>
		);
	}
}

export default Address;
