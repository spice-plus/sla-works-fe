"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { areas, getPrefecturesByArea } from "../../../masters/prefectures";

interface PrefectureSelectorProps {
  selectedPrefectures: string[];
  onChange: (prefectures: string[]) => void;
}

export function PrefectureSelector({
  selectedPrefectures,
  onChange,
}: PrefectureSelectorProps) {
  const handlePrefectureChange = (prefectureCode: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedPrefectures, prefectureCode]);
    } else {
      onChange(selectedPrefectures.filter((code) => code !== prefectureCode));
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium">都道府県を選択</Label>
      <div className="space-y-6">
        {areas.map((area) => {
          const prefectures = getPrefecturesByArea(area.areaCode);
          return (
            <div key={area.areaCode} className="space-y-3">
              <h3 className="font-medium text-sm text-gray-700">
                {area.areaName}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {prefectures.map((prefecture) => (
                  <div
                    key={prefecture.prefectureCode}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`prefecture-${prefecture.prefectureCode}`}
                      checked={selectedPrefectures.includes(
                        prefecture.prefectureCode
                      )}
                      onCheckedChange={(checked) =>
                        handlePrefectureChange(
                          prefecture.prefectureCode,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`prefecture-${prefecture.prefectureCode}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {prefecture.prefectureName}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
