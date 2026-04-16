import {
  ArrowRightOutlined,
  BgColorsOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { AutoComplete, Button, Input, Select } from "antd";
import { useMemo, useState, type FormEvent } from "react";
import type { UiCopy } from "../i18n/translations";
import type { MoodSceneSelection } from "../theme/moodScene";

interface SearchBarProps {
  city: string;
  citySuggestions: ReadonlyArray<string>;
  copy: UiCopy;
  loading: boolean;
  sceneMenuOpen: boolean;
  moodSceneSelection: MoodSceneSelection;
  moodSceneOptions: ReadonlyArray<{ value: MoodSceneSelection; label: string }>;
  onCityChange: (value: string) => void;
  onSceneMenuOpenChange: (open: boolean) => void;
  onMoodSceneChange: (value: MoodSceneSelection) => void;
  onSubmit: () => void;
}

export function SearchBar({
  city,
  citySuggestions,
  copy,
  loading,
  sceneMenuOpen,
  moodSceneSelection,
  moodSceneOptions,
  onCityChange,
  onSceneMenuOpenChange,
  onMoodSceneChange,
  onSubmit,
}: SearchBarProps) {
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);

  const cityOptions = useMemo(() => {
    const normalizedQuery = city.trim().toLocaleLowerCase();

    const filteredSuggestions = citySuggestions.filter((option) => {
      if (!normalizedQuery) {
        return true;
      }

      return option.toLocaleLowerCase().includes(normalizedQuery);
    });

    return filteredSuggestions.map((option) => ({
      value: option,
      label: option,
    }));
  }, [city, citySuggestions]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="search-shell">
      <form className="search-form" onSubmit={handleSubmit}>
        <AutoComplete
          className="search-input-autocomplete"
          dropdownMatchSelectWidth={false}
          open={isCityMenuOpen && cityOptions.length > 0}
          options={cityOptions}
          popupClassName="search-input-dropdown"
          value={city}
          onBlur={() => setIsCityMenuOpen(false)}
          onChange={(value) => onCityChange(value)}
          onFocus={() => setIsCityMenuOpen(true)}
          onSelect={(value) => {
            onCityChange(value);
            setIsCityMenuOpen(false);
          }}
        >
          <Input
            aria-label={copy.search.cityAriaLabel}
            className="search-input"
            value={city}
            onChange={(event) => onCityChange(event.target.value)}
            onClick={() => setIsCityMenuOpen(true)}
            placeholder={copy.search.cityPlaceholder}
            prefix={<EnvironmentOutlined />}
            autoComplete="off"
            allowClear
          />
        </AutoComplete>
        <Select
          aria-label={copy.search.sceneAriaLabel}
          className="scene-select"
          open={sceneMenuOpen}
          value={moodSceneSelection}
          onChange={(value) => onMoodSceneChange(value)}
          onOpenChange={onSceneMenuOpenChange}
          options={moodSceneOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          suffixIcon={<BgColorsOutlined />}
          popupClassName="scene-select-dropdown"
          popupMatchSelectWidth={false}
        />
        <Button
          className="search-button"
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={loading}
          icon={!loading ? <ArrowRightOutlined /> : undefined}
        >
          {loading ? copy.search.submitting : copy.search.submit}
        </Button>
      </form>
    </div>
  );
}
