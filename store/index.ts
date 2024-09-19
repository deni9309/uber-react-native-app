import { create } from 'zustand'

import { DriverStore, LocationStore, MarkerData } from '@/types/type'

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLatitude: null,
  userLongitude: null,
  destinationAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  setUserLocation({ latitude, longitude, address }) {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }))

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState()
    if (selectedDriver) clearSelectedDriver()
  },
  setDestinationLocation({ latitude, longitude, address }) {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }))

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState()
    if (selectedDriver) clearSelectedDriver()
  },
}))

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,

  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),

  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers: drivers })),

  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}))
