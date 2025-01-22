import React, { useState } from 'react'
    import { Button } from '../components/ui/button'
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from '../components/ui/dropdown-menu'
    import { Input } from '../components/ui/input'
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from '../components/ui/select'
    import { MoreHorizontal } from 'lucide-react'

    const campaigns = [
      { value: 'all', label: 'All Campaigns' },
      { value: 'summer', label: 'Summer Sale' },
      { value: 'winter', label: 'Winter Collection' },
    ]

    const assetsData = [
      {
        image: 'https://placehold.co/400',
        title: 'Summer Banner',
        date: '2023-07-01',
        campaign: 'Summer Sale',
      },
      // Add more assets
    ]

    export default function Assets() {
      const [selectedCampaign, setSelectedCampaign] = useState('all')

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Assets</h1>
            <Button>New Asset</Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-64">
              <Input placeholder="Search assets..." />
            </div>
            <Select
              value={selectedCampaign}
              onValueChange={setSelectedCampaign}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select campaign" />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.value} value={campaign.value}>
                    {campaign.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {assetsData.map((asset, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm border"
              >
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{asset.title}</h3>
                    <p className="text-sm text-gray-500">
                      {asset.date} • {asset.campaign}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
