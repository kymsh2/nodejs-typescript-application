import { Flex } from '@ag.ds-next/box';
import { FieldLabel } from '@ag.ds-next/field';
import { Fieldset, FieldsetLegend } from '@ag.ds-next/fieldset';
import { FormStack } from '@ag.ds-next/form-stack';
import { Select, Options } from '@ag.ds-next/select';
import { TextInput } from '@ag.ds-next/text-input';
import * as React from 'react';
import { Component } from 'react';
import DischargePort, { IDischargePort } from './DischargePort';
import { TransportDetails as APITransportDetails } from './api';

export interface ITransportDetails {
	transportMode: string;
	voyageOrFlightNumber?: string;
	vesselName?: string;
	shippingCompany?: string;
	storeTransportTemperatureUnit?: string;
	storeTransportTemperature?: number;
}
type TransportDetailsProps = {
	transportDetails?: APITransportDetails;
	amend?: boolean;
	disabled?: boolean;
};

export const transportModeOptioins: Options = [
	{ value: 'S', label: 'S' },
	{ value: 'A', label: 'A' },
	{ value: 'M', label: 'M' },
];

interface TransportDetailsState {}

class TransportDetails extends React.Component<
	TransportDetailsProps,
	TransportDetailsState
> {
	state = {};

	render() {
		return (
			<Fieldset legend="Transport Details">
				<FormStack>
					<Select
						id="transportMode"
						label="Transport Mode"
						placeholder="Please select"
						disabled={this.props.disabled}
						value={this.props.transportDetails?.transportMode}
						options={transportModeOptioins}
					/>

					<TextInput
						label="Voyage/Flight Number"
						id="voyageOrFlightNumber"
						value={this.props.transportDetails?.voyageOrFlightNumber}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
					<TextInput
						label="Vessel Name"
						id="vesselName"
						value={this.props.transportDetails?.vesselName}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
					<TextInput
						label="Shipping Company"
						id="shippingCompany"
						value={this.props.transportDetails?.shippingCompany}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
					<Flex flexDirection="row" gap={1}>
						<TextInput
							label="Storage Temperature Unit"
							id="rexNo"
							value={
								this.props.transportDetails?.storeTransportTemperature?.unit
							}
							maxWidth="sm"
							disabled={this.props.disabled}
						/>

						<TextInput
							label="Storage Temperature"
							id="rexNo"
							value={
								this.props.transportDetails?.storeTransportTemperature?.value
							}
							maxWidth="xl"
							disabled={true}
						/>
					</Flex>
				</FormStack>
			</Fieldset>
		);
	}
}

export default TransportDetails;
